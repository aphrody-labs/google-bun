// SPDX-License-Identifier: Apache-2.0
package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGatewayHealthzAndStackDecisions(t *testing.T) {
	mux := NewGatewayMux()

	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	rec := httptest.NewRecorder()
	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}
	if got := rec.Header().Get("X-Google-Cloud-Region"); got != "europe-west9" {
		t.Fatalf("expected europe-west9 header, got %q", got)
	}

	var status GatewayStatusResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &status); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}
	if len(status.StackDecisions) != 4 {
		t.Fatalf("expected 4 objective stack decisions, got %d", len(status.StackDecisions))
	}
}

func BenchmarkGatewayHealthz(b *testing.B) {
	mux := NewGatewayMux()
	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		rec := httptest.NewRecorder()
		mux.ServeHTTP(rec, req)
	}
}
